import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
  const [articles, setArticles] = useState([])
  useEffect(() => {
    axios.get('https://www.jalirani.com/files/barstool.json')
    .then(function (response) {
      const articles = response.data.map((article) => {
        return {
          url: article.url,
          title: article.title,
          image: article.thumbnail.location + article.thumbnail.images.small,
          author: article.author.name,
          authorImage: article.author.avatar,
          comment_Count: article.comment_count,
        }
      });

      console.log(articles);
      setArticles(articles);

    }).catch(function (error) {
      console.log(error);
    });
  }, [])
  return (
    <div className="App">
      {articles.map((article) => {
        return (
          <div className='article'>
            <img id='image' src={article.image} atl={article.title} />
            <div id='tile-comment-author'>
              <a href={article.url}>
                <h2>{article.title}</h2>
              </a>
              <img id='author-image' src={article.authorImage} alt={article.author}/>
              <p id='author'>{article.author}</p>
              <p id='comment'>{article.comment_Count} comments</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;

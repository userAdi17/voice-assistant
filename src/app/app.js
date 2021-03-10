import React, {useState, useEffect} from 'react';
import './index.css';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from "../NewsCards/NewsCards";
import useStyles from './styles';
import wordsToNumbers from 'words-to-numbers';

const alanKey = '39ccd1a94935cb5ed9f0fdf625e6d6ea2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    const classes = useStyles();
    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({command, articles, number}) => {
                if (command === 'newHeadlines') {
                    setNewsArticles(articles);
                    setActiveArticle(-1)
                } else if (command === 'highLight') {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1)
                } else if (command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy: true}) : number;
                    const  article=articles[parsedNumber-1];
                    if (parsedNumber>20){
                        alanBtn().playText('Please try that again')
                    }else if(article){
                        window.open(article.url, '_blank')
                        alanBtn().playText('Opening,Please wait a bit')

                    }
                  }
            }

        })

    }, []);
    return (
        <div>
            <div className={classes.logoContainer}>
                <img src='https://voicebot.ai/wp-content/uploads/2019/10/alan.jpg' className={classes.alanLogo}
                     alt='Alan logo'/>
            </div>
            <NewsCards activeArticle={activeArticle} articles={newsArticles}/>
        </div>
    );
};

export default App;
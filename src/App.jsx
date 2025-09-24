import { useState } from 'react'
import Header from './components/header'
import './App.css'
import { languages } from './components/languageslist'
import clsx from 'clsx';
import { getFarewellText,getRandomWord } from './components/utils';

import Confetti from 'react-confetti'

function App() {
  const [current,setcurrent]=useState(getRandomWord())
  let alphabets='abcdefghijklmnopqrstuvwxyz'

  const [guessed,setguessed]=useState([])
  const wrongguess=guessed.filter(letter=> !current.includes(letter)).length
  const correct=guessed.filter(letter=> current.includes(letter)).length


  
  let farewell=''
  const language_list=languages.map((data,index)=>{
    let lostlanguage=index<wrongguess
    
   
    return (
    <span className={`chip ${lostlanguage? 'lost':''}`}style={{backgroundColor:data.backgroundColor,color:data.color}}>
        {data.name}
        </span>
    )
    }
    )
  
  const gamelost=wrongguess>=language_list.length-1
 
 
  

  const isgameWon =current.split("").every(letter => guessed.includes(letter))
   
    const isgameOver = isgameWon || gamelost
  

  function saveguess(letter){
    setguessed(prev=>prev.includes(letter)?prev:[...prev,letter])  
  }
  

  const allletters=alphabets.split("").map(data=>{
    const isGuessed = guessed.includes(data)
    const isCorrect = isGuessed && current.includes(data)
    const isWrong = isGuessed && !current.includes(data)

    const className = clsx({
            correct: isCorrect,
            wrong: isWrong
        })
    return( 
    <button onClick={()=>saveguess(data)} disabled={isgameOver} className={className}>{data.toUpperCase()}</button>)
  })
  let letter=current.split("").map((data,index)=>{
     
      const reveal_letter=isgameOver|| guessed.includes(data)
      const reveal_color=clsx(
        isgameOver && !guessed.includes(data) && 'missed_letter' 
        
      )

    return (
    <span key={index} className={reveal_color}>{reveal_letter?data.toUpperCase():''}</span>)
    
    })


  function new_game(){
    setcurrent(getRandomWord())
    setguessed([])
  }

  let lastguessed=guessed[guessed.length-1]
  let lastincorrect=lastguessed && !current.includes(lastguessed)

  console.log('1',gamelost)
  console.log('1',isgameWon)
  
  function getresult(){

    if(!isgameOver && lastincorrect){
      return(
      <>
       <div className='result_body_farewell'>
            <p>{getFarewellText(languages[wrongguess-1].name)}</p>
        </div>
      
      </>)
    }
    if(isgameWon){
      return(
       <>
               
        <div className='result_body'>
            <p>You Win!<br></br>Well Done👍</p>
        </div>
          </>)

    }
    if(gamelost){
      return (
        <>
        <div className='result_body_lose'>
            <p>Game Over<br></br>You Lose!Better Start Learning Assembly😭</p>
        </div>
                
        </>
      )

    }
    return (
      <p>""<br></br>""</p>
    )


  }
  const gameStatusClass = clsx("game-status", {
        won: isgameWon,
        lost: gamelost,
        farewell: !isgameOver && lastincorrect
    })
  
  

  
  return (
    <>
    <Header/>
    <main>


      <section className='game-status'>
        {getresult()}   
      </section>
      <section className="lang_list">
            <div className="lang_content">
                {language_list}
            </div>      
      </section>
      <section className='word'>
        {letter}

      </section>
      <section className='keyboard_body'>
        <div className='keyboard'>
          {allletters}
        </div> 
      </section>
      {isgameOver?<section className='new_game'>
        <button onClick={new_game}className='new_game_btn'>New Game</button>
      </section>:null}
      </main>
        
    
  
      
    </>
  )
}


export default App

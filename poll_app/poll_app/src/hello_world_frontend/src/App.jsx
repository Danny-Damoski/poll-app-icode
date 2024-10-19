import { useEffect, useState } from 'react';
import { hello_world_backend } from 'declarations/hello_world_backend';

function App() {
  const [greeting, setGreeting] = useState('');
  const [question,setQuestion] = useState('')
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState("MEE205");
  const [results, setResults] = useState([]);

  // Get the questions from the backend
  const fetchQuestion = async () => {
    try {
      setLoading(true);
      const que = await hello_world_backend.getQuestion();
      setQuestion(que); 
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  // Get results from backend
const fetchResults = async () => {
  try {
    setLoading(true);
    const res = await hello_world_backend.getVotes();
    setResults(res); 
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  useEffect(
      ()=>{
       fetchQuestion();
       fetchResults();
       console.log(results)
      },[]
  )
  const optionChange = (e)=>{
      setCourse(e.target.value)
  };

function handleVote(e){
  e.preventDefault();
  hello_world_backend.vote(course).then((res) => {
      setResults(res);
    });
 };
function handleReset(){
  hello_world_backend.resetVotes().then((res) => {
    setResults(res);
  });
};

//  Legacy Code for ref
  // function handleSubmit(event) {
  //   event.preventDefault();
  //   const name = event.target.elements.name.value;

  //   hello_world_backend.greet(name).then((greeting) => {
  //     setGreeting(greeting);
  //   });
  //   return false;
  // }

  return (
    <main className='bg-gray-500 text-white pt-5 min-h-screen bg-indigo-700 '>
     <div className="container mx-auto px-5 w-full relative">
      <div className="border-2 pt-5 border-black p-5 py-3 bg-[#007bff] rounded">
        <h1>Simple Voting Poll</h1>
      </div>
      <h2 id="question" className='my-5'>{question}? </h2>

      {/* <!-- Form where users vote --> */}
      <div className="form-container">
        <form id="radioForm" className='mb-4 border-2 border-black p-4 rounded flex flex-col' onSubmit={handleVote} >
            <label className='block mb-2 text-lg text-start'>
                <input type="radio" name="option" value="MEE205" className='mr-2' checked={course==="MEE205"} onChange={optionChange} /> MEE205
            </label><br />
            <label className='block mb-2 text-lg text-start'>
                <input type="radio" name="option" value="MEE206" className='mr-2' checked={course==="MEE206"} onChange={optionChange} /> MEE206
            </label><br />
            <label className='block mb-2 text-lg text-start'>
                <input type="radio" name="option" value="CSC201" className='mr-2' checked={course==="CSC201"} onChange={optionChange} /> CSC201
            </label><br />
            <label className='block mb-2 text-lg text-start'>
                <input type="radio" name="option" value="CSC202" className='mr-2' checked={course==="CSC202"} onChange={optionChange} /> CSC202
            </label><br />
            <button type="submit" className='px-12 py-5 bg-[#007bff] border-none text-[#fff] text-lg cursor-pointer rounded hover:bg-[#0056b3]' >Vote</button>
        </form>
      </div>

      {/* <!-- Poll results appear here--> */}
      <h2 id="results-title">Results</h2>
      <div id="results" className='mt-4 text-lg border-2 p-4 rounded flex flex-col text-lg font-semibold gap-5'>{results.length !== 0 && results.map((arr,i)=> (<div className='' key={"key11ne" + (i*37)**0.5}> 
            {arr[0]} : {arr[1].toString()}
      </div>))} </div>
        <button id="reset" className='bg-[#007bff] text-lg border-none text-[#fff] text-lg cursor-pointer rounded my-2 px-12 py-2 hover:bg-[#0056b3]' onClick={handleReset}>Reset Poll</button>
    </div>
  
    </main>
  );
}

export default App;

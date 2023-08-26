
const Typewriter = ({text}) => {
  
  const textLength = text.length;

  return (
    <div className="typewriter-effect" style={{ '--text-length': `${textLength}ch` }}>
      {text}
    </div>
  );
   
}


export default Typewriter



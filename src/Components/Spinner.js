import Loading from './Loading.gif'

const Spinner=()=> {
    return (
      <div className='text-center my-3'>
        <img src={Loading} alt='loading'></img>
      </div>
    )
}

export default Spinner

import RingLoader from 'react-spinners/RingLoader'

const Loader: React.FC = () => {
  return (
    <>
      <div className='flex flex-col justify-center w-full'>
        <RingLoader
          color="#36d7b7"
          loading
          size={300}
        />
        <h1 className='m-auto text-3xl bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent'>Loading...</h1>
      </div>
    </>
  )
}

export default Loader;
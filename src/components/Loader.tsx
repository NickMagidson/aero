import { Circles } from 'react-loader-spinner'

const Loader: React.FC = () => {
  return (
    <>
      <Circles
        height="80"
        width="80"
        color="#3b7fd9"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />
    </>
  )
}

export default Loader;
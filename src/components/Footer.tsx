interface FooterProps {
  // Props here
}

const Footer: React.FC<FooterProps> = () => {
  return (
    <div className="flex flex-wrap items-center justify-center w-full px-2 py-3 bg-gradient-to-r from-gray-700 via-gray-900 to-black absolute bottom-0 left-0 shadow-[0px_2px_11px_12px_rgba(0,_0,_0,_0.4)] ">
      <p className="text-white">Copyright 2023 etc</p>
    </div>
  )
}

export default Footer
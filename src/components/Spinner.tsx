import Image from 'next/image'

const Spinner = () => {
  return (
    <div className="bg-black bg-opacity-50 flex justify-center items-center fixed left-0 right-0 bottom-0 top-0 z-50">
      <div>
        <Image src={'/assets/svg/spinner.svg'} alt="Loading..." width={96} height={96} />
      </div>
    </div>
  )
}

export default Spinner

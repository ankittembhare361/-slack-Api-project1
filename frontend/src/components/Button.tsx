
interface ButtonValue {
    label: string,
    onClick: () => any 
}

export function Button({label, onClick}: ButtonValue){

    return <div>
        <button onClick={onClick}  className='w-50 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2'>{label}</button>
    </div>
}
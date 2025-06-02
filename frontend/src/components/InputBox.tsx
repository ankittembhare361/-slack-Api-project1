interface InputValue {
    label: string, 
    placeholder?: string, 
    type: string, 
    value?: string,
    onChange: (e: any) => void
}

export function InputBox({label, placeholder, type, onChange}: InputValue){

     return <div>
        <div className="font-semibold">
             {label}
        </div>
          <input onChange={onChange} type={type} placeholder={placeholder} className="w-80 px-2 py-1 border rounded border-black-200"/>
    </div>
} 
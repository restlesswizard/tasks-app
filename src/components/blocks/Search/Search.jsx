import { useState } from "react"
import { useTasks } from "../../../providers/TaskProdiver/TaskProdiver"

/**
 * 
 * Search Input with filter
 */

export default function Search () {
    const { setSearchQuery } = useTasks();

    const [hasValue, setHasValue] = useState(false);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setHasValue(e.target.value.length > 0);
        setSearchQuery(value) // pass input value into a context
    };

    return (
        <div className='relative w-full flex flex-col-reverse'>
          <input className='p-4 bg-[#555] rounded-lg outline-0 peer' type="search" name="typeTask" id="typeTask" plaсeholder="" onChange={handleInputChange}/>
          <label
            className={`p-4 absolute transition-all duration-200 ease-in-out
                ${hasValue ? '-translate-y-1/2' : 'peer-focus:-translate-y-1/2'}
                `}
            htmlFor="typeTask">
              Search
          </label>
          
        </div>
    )
}
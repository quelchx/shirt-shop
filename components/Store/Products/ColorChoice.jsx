/**
 * @props name is visible server side only, color takes in tailwindcss class
 */
export default function ColorChoice({ name, color }) {
  return (
    <label className="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-400">
      <input
        type="radio"
        name="color-choice"
        value={name}
        className="sr-only"
        aria-labelledby={`color-choice-${name}-label`}
      />
      <p id="color-choice-0-label" className="sr-only">
        {name}
      </p>
      <button
        aria-hidden="true"
        onClick={(e) => {
          // dont want page to resubmit
          e.preventDefault()
        }}
        className={`${color} h-8 w-8 border border-black border-opacity-10 rounded-full active:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300`}
      ></button>
    </label>
  )
}

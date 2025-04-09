export default function Die(props) {
  return (
    <button
      className={props.isHeld ? 'die held' : 'die'}
      onClick={props.hold}
      aria-pressed={props.isHeld}
      aria-label={`Die with value ${props.value}, ${
        props.isHeld ? 'held' : 'not held'
      }`}
    >
      {props.value}
    </button>
  );
}

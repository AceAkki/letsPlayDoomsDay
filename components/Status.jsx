import clsx from "clsx";
export default function Status(props) {
  function UpdateStatus() {
    if (props.gameStatus) {
      return props.won ? (
        <>
          <h2 className="status-title">You Won</h2>
          <p>{`And achieved peace with ${
            props.heroesArr[props.heroesArr.length - 1].name
          }`}</p>
        </>
      ) : props.lost ? (
        <>
          <h2 className="status-title">You Lost</h2>
          <p>{`And all heroes are killed by ${
            props.heroesArr[props.heroesArr.length - 1].name
          }`}</p>
        </>
      ) : <>
      <h2></h2>
      <p></p>
      </>;
    } else {
      return props.wrongArr.length > 0 ? (
        <>
          <h2 className="status-title">
            {props.heroesArr[props.wrongArr.length - 1].name}
          </h2>
          <p>{`has died fighting ${
            props.heroesArr[props.heroesArr.length - 1].name
          }`}</p>
        </>
      ) : <>
      <h2 className="status-title"> &nbsp;</h2>
      <p>&nbsp;</p>
      </>;
    }
  }

  let dynamicClass = clsx("status-wrap", {
    won: props.won,
    lost: props.lost,
    doomed: !props.won && !props.lost && props.wrongArr.length > 0,
  });

  return (
    <section className={dynamicClass} ref={props.ref}>
      <UpdateStatus />
    </section>
  );
}

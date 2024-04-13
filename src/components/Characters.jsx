export default function Characters({ data, onClick }) {
    return (
      <div className="characters">
        {data.map((dataItem) => {
          return (
            <div
              key={dataItem.id}
              className="characterCard"
              onClick={() => onClick(dataItem.id)}
            >
              <div className="caption">{dataItem.name}</div>
              <div className="caption bottom">View Comics</div>
            </div>
          );
        })}
      </div>
    );
  }
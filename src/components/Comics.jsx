export default function Comics({ data, onClick }) {
    return (
      <div className="comics">
        {data.map((dataItem) => {
          const detailsUrl = dataItem.urls.find(
            (element) => element["type"] === "detail"
          ).url;
  
          return (
            <a
              key={dataItem.id}
              className="comicCard"
              href={detailsUrl}
              target="_blank"
              rel="noreferrer"
            >
              <div className="comic-info">
                <div className="title">{dataItem.title}</div>
                <div className="additional-info">
                  <span>Pages: {dataItem.pageCount}</span>
                  <span>Characters: {dataItem.characters.available}</span>
                  <span>Price: ${dataItem.prices[0].price}</span>
                </div>
              </div>
              <div className="caption bottom">Details</div>
            </a>
          );
        })}
      </div>
    );
  }
  
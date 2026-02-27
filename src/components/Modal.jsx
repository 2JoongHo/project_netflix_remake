import "./Modal.css";

function Modal({ backdrop_path, title, overview, setModalOpen, name }) {
  return (
    <div className="modal">
      {/* 닫기 버튼 */}
      <span className="modal-close" onClick={() => setModalOpen(false)}>
        X
      </span>
      {/* 모달 포스터 */}
      <img
        className="modal-poster"
        src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
        alt="modal-poster"
      />
      {/* 모달 정보 */}
      <div className="modal-content">
        <h2 className="modal-title">{title ? title : name}</h2>
        <p className="modal-overview">{overview}</p>
        <div className="modal-buttons">
          <button className="modal-play-btn">▶ 재생</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

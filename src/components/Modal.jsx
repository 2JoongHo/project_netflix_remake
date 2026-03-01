import Button from "./Button";
import "./Modal.css";

function Modal({ backdrop_path, title, overview, setModalOpen, name }) {
  return (
    <div className="modal-container">
      <div className="wrapper-modal">
        <div className="modal">
          {/* 닫기 버튼 */}
          <span className="modal-close" onClick={() => setModalOpen(false)}>
            X
          </span>
          {/* 모달 포스터 */}
          <div className="modal-poster-container">
            <img
              className="modal-poster"
              src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
              alt="modal-poster"
            />
            <div className="modal-poster-btn">
              <Button text="▶ 재생" type="play" />
            </div>
          </div>
          {/* 모달 정보 */}
          <div className="modal-content">
            <h2 className="modal-title">{title ? title : name}</h2>
            <p className="modal-overview">{overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

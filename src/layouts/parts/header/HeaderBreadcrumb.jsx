function HeaderBreadcrumb({ currentBreadcrumb }) {
  return (
    <>
      {currentBreadcrumb.map((item, index) => {
        if (index === currentBreadcrumb.length - 1) {
          return (
            <span
              key={item}
              className="breadcrumb-item breadcrumb-item-last animate__animated animate__fadeInRight"
            >
              {item}
            </span>
          );
        } else {
          return (
            <span key={index} className="breadcrumb-item">
              {item}
              <span className="breadcrumb-item-Oblique">/</span>
            </span>
          );
        }
      })}
    </>
  );
}

export default HeaderBreadcrumb;

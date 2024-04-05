import React from 'react'

const CertificateItems = ({item}) => {
  return (
    <div className="certification__card" key={item.id}>
        <h3 className="certification__title">{item.title}</h3>
        <p className="certification__description">
            {item.description}
        </p>
        <a href={item.plink} className="certification__button" target='_blank'>
            View <i className="bx bx-right-arrow-alt certificate__button-icon"></i>
        </a>
    </div>
  )
}

export default CertificateItems
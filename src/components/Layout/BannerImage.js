import banner from '../../assets/r.webp'

function BannerImage() {
  return (
    <div
      style={{
        backgroundImage: `url(${banner})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        minHeight: '250px',
        height: '20rem',
        maxWidth: '100%',
      }}
    >
      {/* <div className="container" style={{ minHeight: '550px' }}></div> */}
    </div>
  )
}
export default BannerImage

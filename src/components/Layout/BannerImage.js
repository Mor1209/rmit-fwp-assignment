import banner from '../../assets/r.webp'

function BannerImage({ url }) {
  const image = url === null ? banner : url
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        minHeight: '30vh',
        height: '20rem',
        // maxWidth: '100%',
      }}
    />
  )
}
export default BannerImage

import React from "react"
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="140" cy="110" r="110" />
    <rect x="0" y="242" rx="3" ry="3" width="280" height="27" />
    <rect x="-1" y="290" rx="6" ry="6" width="280" height="89" />
    <rect x="2" y="409" rx="0" ry="0" width="100" height="37" />
    <rect x="114" y="399" rx="27" ry="27" width="163" height="56" />
  </ContentLoader>
)

export default Skeleton;

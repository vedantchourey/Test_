import { Typography } from "@mui/material";
import styles from './mainBannerHeading.module.css'

interface Props {
    heading: string
}

const MainBannerHeading = ({ heading }: Props) => {
  return (
    <div className={styles.mainBanner}>
      <Typography className={styles.mainBannerText}>
        {heading}
      </Typography>
    </div>
  )
}

export default MainBannerHeading
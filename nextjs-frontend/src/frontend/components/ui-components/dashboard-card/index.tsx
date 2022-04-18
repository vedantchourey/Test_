import { Grid } from "@mui/material";
import CardLayout from "../card-layout";

interface DashboardCardProp {
  leftChild?: JSX.Element;
  rightChild?: JSX.Element;
  isReverse?: boolean;
}

const DashboardCard: React.FC<DashboardCardProp> = ({
  leftChild,
  rightChild,
  isReverse = false,
}) => {
  const left = isReverse ? 3 : 9;
  const right = isReverse ? 9 : 3;
  return (
    <CardLayout>
      <Grid container>
        <Grid item md={left}>
          {leftChild}
        </Grid>
        <Grid item md={right}>
          {rightChild}
        </Grid>
      </Grid>
    </CardLayout>
  );
};

export default DashboardCard;

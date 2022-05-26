import { Box } from "@mui/material";
export interface MemberProp {
  name: string;
  image: string;
  tags: string[];
  type: string;
}

const Member: React.FC<MemberProp> = ({ image, type }) => {
  return (
    <Box width={"100%"} minHeight={365} position="relative">
      <img
        src={image}
        style={{ position: "absolute", width: "100%", zIndex: -1 }}
      />
      <img
        src={`/images/teams/${type}_Card.png`}
        style={{ zIndex: 1, width: "100%" }}
      />
    </Box>
  );
};

export default Member;

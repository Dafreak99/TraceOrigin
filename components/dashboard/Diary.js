import { AiFillMedicineBox } from "react-icons/ai";
import { BiWater } from "react-icons/bi";
import { FaFish } from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";
import { RiStickyNoteFill } from "react-icons/ri";
import CheckupModal from "./CheckupModal";
import FeedingDiaryModal from "./FeedingDiaryModal";
import PondEnvironmentModal from "./PondEnviromentModal";
import UsingMedicineDiaryModal from "./UsingMedicineDiaryModal";
import NoteModal from "./NoteModal";
import { Grid, Text } from "@chakra-ui/layout";
import { Alert, AlertIcon } from "@chakra-ui/alert";

const Diary = ({ pond }) => {
  return (
    <Grid
      gridTemplateColumns="repeat(4, 1fr)"
      padding="3rem 2rem"
      background="#fff"
    >
      {pond?.seed?.isRegistered === "true" ? (
        <>
          <FeedingDiaryModal
            bg="#f1dbf4"
            color="#d038d0"
            icon={FaFish}
            pondId={pond._id}
          />
          <UsingMedicineDiaryModal
            bg="#d9e6fb"
            color="#1777ef"
            icon={GiMedicines}
            pondId={pond._id}
          />
          <NoteModal
            bg="#dbf4e8"
            color="#38d09f"
            icon={RiStickyNoteFill}
            pondId={pond._id}
          />
          <PondEnvironmentModal
            bg="#fbe2d9"
            color="#ef5d17"
            icon={BiWater}
            pondId={pond._id}
          />

          <CheckupModal
            bg="#e1d9fb"
            color="#6a17ef"
            icon={AiFillMedicineBox}
            pondId={pond._id}
          />
        </>
      ) : (
        <Alert status="warning" gridColumn="span 6">
          <AlertIcon />
          <Text fontSize="md">
            Chỉ có thể tiến hành ghi chép khi đã được duyệt đăng ký sản phẩm
          </Text>
        </Alert>
      )}
    </Grid>
  );
};

export default Diary;

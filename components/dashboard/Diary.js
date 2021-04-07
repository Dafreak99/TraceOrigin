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

const Diary = ({ pondId }) => {
  return (
    <>
      <FeedingDiaryModal
        bg="#f1dbf4"
        color="#d038d0"
        icon={FaFish}
        pondId={pondId}
      />
      <UsingMedicineDiaryModal
        bg="#d9e6fb"
        color="#1777ef"
        icon={GiMedicines}
        pondId={pondId}
      />
      <NoteModal
        bg="#dbf4e8"
        color="#38d09f"
        icon={RiStickyNoteFill}
        pondId={pondId}
      />
      <PondEnvironmentModal
        bg="#fbe2d9"
        color="#ef5d17"
        icon={BiWater}
        pondId={pondId}
      />

      <CheckupModal
        bg="#e1d9fb"
        color="#6a17ef"
        icon={AiFillMedicineBox}
        pondId={pondId}
      />
    </>
  );
};

export default Diary;

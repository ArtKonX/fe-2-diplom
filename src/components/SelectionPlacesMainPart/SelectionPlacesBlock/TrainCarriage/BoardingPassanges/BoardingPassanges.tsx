import BoardingPassangesFirst from "./BoardingPassangesFirst/BoardingPassangesFirst"
import BoardingPassangesFourth from "./BoardingPassangesFourth/BoardingPassangesFourth"
import BoardingPassangesSecond from "./BoardingPassangesSecond/BoardingPassangesSecond"
import BoardingPassangesThird from "./BoardingPassangesThird/BoardingPassangesThird"

const BoardingPassanges = ({ type, seats, directionTrain }: {type: string | undefined, seats: Seat[] | undefined, directionTrain: "departure" | "arrival"}) => {

    return (
        <>
            {type == 'fourth' && seats && <BoardingPassangesFourth type={type} seats={seats} directionTrain={directionTrain}  />}
            {type == 'third' && seats && <BoardingPassangesThird type={type} seats={seats} directionTrain={directionTrain}  />}
            {type == 'second' && seats && <BoardingPassangesSecond type={type} seats={seats} directionTrain={directionTrain}  />}
            {type == 'first' && seats && <BoardingPassangesFirst type={type} seats={seats} directionTrain={directionTrain}  />}
        </>
    )
}

export default BoardingPassanges
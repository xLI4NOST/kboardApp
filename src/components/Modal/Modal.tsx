import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Form} from "@/components/Form/Form";
import {CloseIcon} from "@/components/Modal/icons/CloseIcon";

export interface ModalProps {
    content: 'form' | 'confirm';
    isOpen: boolean;
    setIsOpen: () => void;
    handleAddTask: () => void;
}

export const Modal = ({isOpen, setIsOpen, content, handleAddTask}) => {
    return isOpen && <Card className="fixed min-w-[300px] left-[50%] top-[35%] z-[3] translate-x-[-50%]">
        <CardHeader>
            <button className='cursor-pointer' onClick={(e)=>{
                e.stopPropagation();
                setIsOpen();
            }}>
                <CloseIcon/>
            </button>
            <CardTitle className="text-center">Добавить задачу</CardTitle>
        </CardHeader>
        <CardContent>
            <Form handleAddCard={handleAddTask}/>
        </CardContent>
    </Card>
}
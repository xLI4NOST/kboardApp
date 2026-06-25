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
    content: 'addTask' | 'addCard';
    isOpen: boolean;
    setIsOpen: () => void;
}

export const Modal = ({isOpen, setIsOpen, content}: ModalProps) => {
    return isOpen && <Card className="fixed min-w-[300px] left-[50%] top-[35%] z-[3] translate-x-[-50%]">
        <CardHeader>
            <button className='cursor-pointer' onClick={(e)=>{
                e.stopPropagation();
                setIsOpen();
            }}>
                <CloseIcon/>
            </button>
            <CardTitle className="text-center">{content === 'addTask' ? 'Добавить задачу' : 'Добавить карточку'}</CardTitle>
        </CardHeader>
        <CardContent>
            <Form setIsOpen={setIsOpen} content={content}/>
        </CardContent>
    </Card>
}
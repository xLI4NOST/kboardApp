import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,

} from "@/components/ui/select"

export const Priority = ({...props}) => {
    return <Select onValueChange={props.onChange} value={props.value}>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Приоритет" {...props}/>
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="critical">
                <div className='flex flex-row gap-[10px] items-center'>
                    <p>Критический</p>
                    <span className='block w-[50px] h-[20px] rounded-sm bg-[#FFB9B9]'></span>
                </div>
            </SelectItem>
            <SelectItem value="high">
                <div className='flex flex-row gap-[10px] items-center'>
                    <p>Высокий</p>
                    <span className='block w-[50px] h-[20px] rounded-sm bg-[#FFC48D]'></span>
                </div>
            </SelectItem>
            <SelectItem value="medium">
                <div className='flex flex-row gap-[10px] items-center'>
                    <p>Средний</p>
                    <span className='block w-[50px] h-[20px] rounded-sm bg-[#FFED8F]'></span>
                </div>
            </SelectItem>
            <SelectItem value="low">
                <div className='flex flex-row gap-[10px] items-center'>
                    <p>Низкий</p>
                    <span className='block w-[50px] h-[20px] rounded-sm bg-[#D6D6D6]'></span>
                </div>
            </SelectItem>
        </SelectContent>

    </Select>
}
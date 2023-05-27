export default function Table(){
return(
        <table className="w-2/3 my-5 text-center table-fixed border mx-auto relative">
            <thead>
                <tr>
                    <th className="w-10 py-2 border">№</th>
                    <th className="py-2 border">Наименование работ</th>
                    <th className="w-48 py-2 border">Дата начала работ</th>
                    <th className="w-48 py-2 border">Дата оконачании работ</th>
                    <th className="border py-2">Адрес</th>
                    <th className="border py-2">Статус</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border">1</td>
                    <td className="border">Ремонт кровельного покрытия дома</td>
                    <td className="border">23.05.23</td>
                    <td className="border">24.05.23</td>
                    <td className="border">ул. Вешняковкая 5, корпус 3</td>
                    <td className="border">Планирование</td>
                </tr>
                <tr>
                    <td className="border">2</td>
                    <td className="border">Ремонт мусоропроводов</td>
                    <td className="border">23.05.23</td>
                    <td className="border">24.05.23</td>
                    <td className="border">ул. Вешняковкая 5, корпус 3</td>
                    <td className="border">Планирование</td>
                </tr>
                <tr>
                    <td className="border">3</td>
                    <td className="border">Ремонт электрооборудования (эл. щитков, замена АВР (аварийное включение резерва) и др. работы)</td>
                    <td className="border">23.05.23</td>
                    <td className="border">24.05.23</td>
                    <td className="border">ул. Вешняковкая 5, корпус 3</td>
                    <td className="border">Планирование</td>
                </tr>
                <tr>
                    <td className="border">4</td>
                    <td className="border">Снятие показаний общеведомового прибора учета (если входит состав общеведомового имущества</td>
                    <td className="border">23.05.23</td>
                    <td className="border">24.05.23</td>
                    <td className="border">ул. Вешняковкая 5, корпус 3</td>
                    <td className="border">Планирование</td>
                </tr>
                <tr>
                    <td className="border">5</td>
                    <td className="border">Техническая инвентаризация</td>
                    <td className="border">23.05.23</td>
                    <td className="border">24.05.23</td>
                    <td className="border">ул. Вешняковкая 5, корпус 3</td>
                    <td className="border">Планирование</td>
                </tr>
                <tr>
                    <td className="border">6</td>
                    <td className="border">Техническое обслуживание светильников держурного освещения</td>
                    <td className="border">23.05.23</td>
                    <td className="border">24.05.23</td>
                    <td className="border">ул. Вешняковкая 5, корпус 3</td>
                    <td className="border">Планирование</td>
                </tr>
                <tr>
                    <td className="border">7</td>
                    <td className="border">Техническое обслуживаение систем дистанционного снятия показаний индивидуальных приборов учета (водопотребления и электроэнергии</td>
                    <td className="border">23.05.23</td>
                    <td className="border">24.05.23</td>
                    <td className="border">ул. Вешняковкая 5, корпус 3</td>
                    <td className="border">Планирование</td>
                </tr>
                <tr>
                    <td className="border">8</td>
                    <td className="border">Утепление трубопроводов в подвальных помещениях</td>
                    <td className="border">24.05.23</td>
                    <td className="border">ул. Вешняковкая 5, корпус 3</td>
                    <td className="border">Планирование</td>
                </tr>
                <tr>
                    <td className="border">9</td>
                    <td className="border">Мытье пола кабины лифта</td>
                    <td className="border">23.05.23</td>
                    <td className="border">24.05.23</td>
                    <td className="border">ул. Вешняковкая 5, корпус 3</td>
                    <td className="border">Планирование</td>
                </tr>
                <tr>
                    <td className="border">10</td>
                    <td className="border">Мытье чердачных лестниц</td>
                    <td className="border">23.05.23</td>
                    <td className="border">24.05.23</td>
                    <td className="border">ул. Вешняковкая 5, корпус 3</td>
                    <td className="border">Планирование</td>
                </tr>
                <tr>
                    <td className="border">11</td>
                    <td className="border">Уборка чердачного помещения</td>
                    <td className="border">23.05.23</td>
                    <td className="border">24.05.23</td>
                    <td className="border">ул. Вешняковкая 5, корпус 3</td>
                    <td className="border">Планирование</td>
                </tr>
                <tr>
                    <td className="border">12</td>
                    <td className="border">Восстановление работоспособности вентиляционных и промывочных устройств, мусороприменых клапанов и шиберных устройств</td>
                    <td className="border">23.05.23</td>
                    <td className="border">24.05.23</td>
                    <td className="border">ул. Вешняковкая 5, корпус 3</td>
                    <td className="border">Планирование</td>
                </tr>
            </tbody>
        </table>
    )
}
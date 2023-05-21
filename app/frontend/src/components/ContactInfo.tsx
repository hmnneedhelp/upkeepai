
import Script from "next/script";
const ContactInfo = ({ contact }) => {
    const { name, id} = contact || {};
    if (!contact) {
      return (
        <p>Дома не существует</p>
        )
    }
    return (
      <>
        <h4>Идентификатор - {id}</h4>
        <div className="text-left mx-auto">
            <p> Год постройки: {contact.year_built} </p>
            <p> Год реконструкции: {contact.year_reconstructed}</p>
            <p> Форма собственности: {contact.form_of_ownership} </p>
            <p> Количество этажей: {contact.num_floors} </p>
            <p> Количество входов: {contact.num_entrances} </p>
            <p> Количество квартир: {contact.num_apartments} </p>
            <p> Общая площадь: {contact.total_area} кв.м</p>
            <p> Жилая площадь: {contact.living_area} кв.м</p>
            <p> Материал стен: {contact.wall_material} </p>
            <p> Количество жалоб: {contact.accident_rate} </p>
            <p> Количество пассажирских лифтов: {contact.num_passenger_elevators} </p>
            <p> Очередь на очистку крыши: {contact.roof_cleaning} </p>
            <p> Материал крыши: {contact.roofing_material} </p>
            <p> Unom: {contact.unom} </p>
            <p> Типы жилищного фонда: {contact.housing_stock} </p>
            <p> Статус МКД: {contact.mkd_status} </p>
            <p> Статус управления МКД: {contact.mkd_management_status} </p>
            <p> Причина изменения статуса МКД: {contact.reason_for_status_change} </p>
            <p> Категория МКД: {contact.mkd_category} </p>
        </div>
      </>
    );
  }
  
  export default ContactInfo;
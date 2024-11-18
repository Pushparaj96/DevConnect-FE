

const UserCard = ({user}) => {

    const { firstName , lastName , gender , age , photoUrl ,skills , bio} = user;

  return (
    <div className="card card-compact bg-base-300 w-96 shadow-xl mb-10">
    <figure>
    <img
      src={photoUrl}
      alt="pics" 
      className="h-72 w-full p-3"
      />
    </figure>
     <div className="card-body">
    <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
    { age && gender && <p>{`${age} , ${gender.charAt(0).toUpperCase()+gender.slice(1).toLowerCase()}`}</p>}
    { bio && <p>{bio}</p>}
    { skills && <p>{skills.toString()}</p>}
    <div className="card-actions justify-center mt-2">
        <button className="btn btn-error text-base">Ignore</button>
        <button className="btn btn-success text-base">Interested</button>
    </div>
     </div>
    </div>
  )
}

export default UserCard;
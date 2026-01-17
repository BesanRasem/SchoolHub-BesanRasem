function Header(){
return(
    <div>
    <h2 className="mb-5 fw-bold">Homework</h2>
   
        <select className="form-select mb-4" defaultValue="All">
          <option value="ALL">All Subjects</option>
          <option value="Math">Math</option>
          <option value="English">English</option>
          <option value="Science">Science</option>
          <option value="History">History</option>

        </select>
        </div>
     
)

}
export default Header;
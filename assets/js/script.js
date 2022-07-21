const d = document,
$title = d.querySelector(".crud-title"),
$form = d.querySelector(".crud-form"),
$table = d.querySelector(".crud-table"),
$template = d.getElementById("crud-template").content,
$fragment = d.createDocumentFragment(),
$agregar = d.querySelector(".add"),
$close = d.querySelector('.close');


const getAll = async ()=>{
    let res = await fetch("http://localhost:8081/users")
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(data => {
        console.log(data)
        data.forEach(user=>{
            $template.querySelector(".nombre").textContent = user.nombre;
            $template.querySelector(".apellidos").textContent = user.apellidos;
            $template.querySelector(".edad").textContent = user.edad;
            $template.querySelector(".email").textContent = user.email;
            $template.querySelector(".estado").textContent = user.estado;
            $template.querySelector(".edit").dataset.id = user._id;
            $template.querySelector(".edit").dataset.nombre = user.nombre;
            $template.querySelector(".edit").dataset.apellidos = user.apellidos;
            $template.querySelector(".edit").dataset.edad = user.edad;
            $template.querySelector(".edit").dataset.email = user.email;
            $template.querySelector(".edit").dataset.estado = user.estado;
            $template.querySelector(".delete").dataset.id = user._id;
            let $clone = d.importNode($template, true)
            $fragment.appendChild($clone)

        })
        $table.querySelector("tbody").appendChild($fragment)
    })
    .catch(error=>{
        let message = "Ocurrió un error";
        console.log(message)
    })

}


d.addEventListener("DOMContentLoaded", getAll)


d.addEventListener("submit", e=>{
    if(e.target === $form) e.preventDefault()

    if(!e.target._id.value){
        //Create
        fetch(`http://localhost:8081/users`, {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                nombre: e.target.nombre.value,
                apellidos: e.target.apellidos.value,
                edad: e.target.edad.value,
                email: e.target.email.value,
                estado: e.target.estado.value
            })
        })
    }else{
        //Put
        fetch(`http://localhost:8081/users/${e.target._id.value}`, {
            method: 'PUT',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                nombre: e.target.nombre.value,
                apellidos: e.target.apellidos.value,
                edad: e.target.edad.value,
                email: e.target.email.value,
                estado: e.target.estado.value
            })
        })
    }
})

d.addEventListener("click", e=>{

    if(e.target.matches(".add")){
        d.querySelector('.form-container').classList.remove("d-none")
        d.querySelector(".capa").style.display = "block";
    }

    if(e.target.matches(".edit")){
        $title.textContent = "Editar Usuario"
        $form.nombre.value = e.target.dataset.nombre
        $form.apellidos.value = e.target.dataset.apellidos
        $form.edad.value = e.target.dataset.edad
        $form.email.value = e.target.dataset.email
        $form.estado.value = e.target.dataset.estado
        $form._id.value = e.target.dataset.id

        d.querySelector('.form-container').classList.remove("d-none")
        d.querySelector(".capa").style.display = "block";

    }

    if(e.target.matches(".delete")){
        let $error = d.createElement("div")
        let isDeleted = confirm(`Deseas eliminar el ID: ${e.target.dataset.id}`)
        if(isDeleted){
            setTimeout(() => {
                location.reload()
            }, 5000);
            fetch(`http://localhost:8081/users/${e.target.dataset.id}`, {
                method: "DELETE",
                body:  $table.insertAdjacentElement("afterend", $error),                    
            })
            $error.setAttribute("class", "alert alert-danger")
            $error.innerHTML = "Se ha eliminado un Usuario"
        }
    }

    if(e.target === $close){
        d.querySelector('.form-container').classList.add("d-none")
        d.querySelector(".capa").style.display = "none";
        location.reload()
    }
})
const apiUrl = "http://127.0.0.1:5001";

const tbody = document.querySelector("table tbody");
const deleteTour = document.getElementById("deleteEmployeeModal");

window.onload = function () {
    getTours();
};

async function getTours() {
    const res = await fetch(`${apiUrl}/api/tours/list`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.sessionStorage.getItem("id_user"),
        },
    });
    const data = await res.json();
    data.tours.forEach((tour, index) => {
        const template = `<tr>
		</th>
		<th>${index}</th>
		<th>${tour.tourname}</th>
		<th>${tour.price_B}</th>
		<th>${tour.price_G}</th>
		<th><textarea class="form-control" id="exampleFormControlTextarea1" rows="3">${tour.intro}</textarea></th>
		<th>
			<a href="#editEmployeeModal" class="edit editModal" data-toggle="modal" value=${tour._id} onclick='handleEdit(this)'>
				<i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
			</a>
			<a href="#deleteEmployeeModal" class="delete deleteModal" data-toggle="modal"  value=${tour._id} onclick='handleDelete(this)'>
				<i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
			</a>
		</th>
	</tr>`;
        tbody.insertAdjacentHTML("beforeend", template);
    });
}
function updateInput(id, value) {
    document.getElementById(id).setAttribute("value", value);
}
function handleDelete(t) {
    const id = t.getAttribute("value");

    deleteTour.addEventListener("submit", async function (e) {
        const res = await fetch(`${apiUrl}/api/tours/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer " + window.sessionStorage.getItem("id_user"),
            },
        });
    });
}

function handleEdit(t) {
    let th = t.parentElement.parentElement.querySelectorAll("th");
    const id = t.getAttribute("value");
    const tourName = th[1].textContent;
    const priceB = th[2].textContent.replace(/[.,VND\s]/g, "");
    const priceG = th[3].textContent.replace(/[.,VND\s]/g, "");
    const info = th[4].textContent;

    const template = `<form class="modal-dialog" role="document">
	<div class="modal-content">
		<div class="modal-header">
			<h5 class="modal-title">chỉnh sửa</h5>
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
		<div class="modal-body">
			<div class="form-group">
				<label>tour</label>
				<input id="tourname" oninput="updateInput('tourname',this.value)" type="text" class="form-control" value="${tourName}">
			</div>
			<div class="form-group">
				<label>giá bán</label>
				<input id="price_B" oninput="updateInput('price_B',this.value)" type="text" class="form-control" value="${priceB}" required>
			</div>
			<div class="form-group">
				<label>giá gốc</label>
				<input id="price_G" oninput="updateInput('price_G',this.value)" type="text" class="form-control" value="${priceG}" required>
			</div>
			<div class="form-group">
				<label>giới thiệu tour</label>
				<textarea id="intro" oninput="updateInput('intro',this.value)" class="form-control" id="exampleFormControlTextarea1" rows="5" required>${info}</textarea>
			</div>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
			<button type="submit" class="btn btn-success">Lưu</button>
		</div>
	</div>
</form>`;

    const editTour = document.querySelector("#editEmployeeModal");
    if (editTour.firstChild) {
        editTour.removeChild(editTour.firstChild);
    }
    editTour.insertAdjacentHTML("beforeend", template);

    editTour.addEventListener("submit", async function (e) {
        let vnd = Intl.NumberFormat("it-IT", {
            style: "currency",
            currency: "VND",
        });
        const tour = {
            tourname: e.target[1].value,
            price_B: vnd.format(
                Number(e.target[2].value.replace(/[.,VND\s]/g, ""))
            ),
            price_G: vnd.format(
                Number(e.target[3].value.replace(/[.,VND\s]/g, ""))
            ),
            intro: e.target[4].value,
        };
        console.log(tour);
        const res = await fetch(`${apiUrl}/api/tours/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer " + window.sessionStorage.getItem("id_user"),
            },
            body: JSON.stringify(tour),
        });

        //const data = await res.json();
        
    });
}

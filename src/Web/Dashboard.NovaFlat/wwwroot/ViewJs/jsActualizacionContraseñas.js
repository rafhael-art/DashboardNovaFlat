const urlObtenerUsuario = baseUrl + 'ActualizacionContraseña/ObtenerUsuario';
const urlGuardar = baseUrl + 'ActualizacionContraseña/ActualizarContraseña';
const modal = $("#modal-actualizarContrasenia");
$(function () {

    fObtenerUsuario();
});

async function fObtenerUsuario() {
    const User = await new Promise((resolved, reject) => {
        fetch(urlObtenerUsuario)
            .then(function (res) {
                return res.json();
            })
            .then(function (miJson) {
                resolved(miJson);
            })
    });

    $("#usua_codigo_usuario").val(User.usua_codigo_usuario);
    $("#usua_nombre_usuario").val(User.usua_nombre_usuario);
    $("#usua_password_usuario").val(User.usua_password_usuario);
    $("#usua_icod_usuario").val(User.usua_icod_usuario);

}


$("#exampleCheck1").change(function () {
    const estaSeleccionado = $('#exampleCheck1').is(":checked");
    const input = document.getElementById("usua_password_usuario");
    usua_password_usuario
    if (estaSeleccionado) {
        input.type = 'text';
        return;
    }
    if (!estaSeleccionado) {
        input.type = 'password';
        return;
    }
});

function fCambiarContrasenia() {
    modal.modal('show');
}

async function fGuardar() {
    let pass1 = $("#txtContrasenia").val()
    let pass2 = $("#txtContrasenia2").val()
    if (pass1 !== pass2) {
        alert("Las Contraseñas Ingresadas no Coinciden!")
        return;
    }


    const EUsuario = {
        usua_icod_usuario  : $("#usua_icod_usuario").val(),
        usua_password_usuario: pass1
    }

    const result = await new Promise((resolved, reject) => {
        fetch(urlGuardar, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(EUsuario),
        }).then(function (res) {
            return res.json();
        }).then(function (miJson) {
            resolved(miJson)
        });

        
    });
    swal("Correcto!", result, "success");
    modal.modal('hide');
    fObtenerUsuario();
}



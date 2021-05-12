import React from 'react';
import { useDropzone } from 'react-dropzone';

function Upload({ accept, maxFiles }) {
    const [files, setFiles] = React.useState([])
    const onDropForUpload = file => setFiles(file)
    const del = id => {
        let index = files.filter((e) => e.path !== id)
        if(index) {
            setFiles(index)
        }
    }
    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps
    } = useDropzone({
        accept,
        onDrop: onDropForUpload,
        maxFiles,
    });

    React.useEffect(() => console.log(files),[files])
    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
            <ul>
                {errors.map(e => (
                    <li key={e.code}>{e.message}</li>
                ))}
            </ul>
        </li>
    ));
    const enviarArquivos = () => {
        const formData = new FormData()
        if(files.length > 0) {
            files.map((e) => formData.append('file',e))

            console.log(formData)
        }else{
            alert("Voce nao enviou os arquivos filho da puta")
        }
    }                
    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
                <em>(Only *.jpeg and *.png images will be accepted)</em>
            </div>
            <aside>
                <h4>Accepted files</h4>
                <ul>
                    {files.map((el) => (
                        <li>{el.path} - {el.size}<button onClick={() => del(el.path)}>DELETE FILE</button></li>
                    ))}
                </ul>
                <h4>Rejected files</h4>
                <ul>{fileRejectionItems}</ul>
                <button onClick={enviarArquivos}>ENVIAR ARQUIVOS</button>
            </aside>
        </section>
    );
}

export default Upload
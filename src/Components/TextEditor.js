import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import '../all.css';
 
const TOOLBAR_OPTIONS = [
    [{header:[1,2,3,4,5,6,false]}],
    [{font:[]}],
    [{list: "ordered" },{list:"bullet"}],
    ["bold","italic","underline"],
    [{color:[]},{background:[]}],
    [{script:"sub"},{script:"super"}],
    [{align:[]}],
    ["image","blockquote","code-block"],
    ["clean"]
]
function TextEditor(){
  const { id: documentId } = useParams();
    const [socket,setSocket] = useState();
    const [quill,setQuill] = useState();

    useEffect(()=>{
        const s = io('http://127.0.0.1:5001');

        setSocket(s)

        return ()=>{
            s.disconnect();
        }
    },[]);

    useEffect(()=>{
         if(socket == null || quill == null) return;

         socket.once('load-document',document=>{
           quill.setContents(document);
           quill.enable();
         })

         socket.emit('get-document',documentId);
    },[socket,quill,documentId])
    
    const wrapperRef = useCallback(wrapper=>{
        if(wrapper==null) return;

        wrapper.innerHTML = ""
        const editor = document.createElement('div');
        wrapper.append(editor);
        const q = new Quill(editor,{ theme:"snow",modules:{toolbar: TOOLBAR_OPTIONS}});
        setQuill(q);
    },[]);

    useEffect(()=>{

        if(socket==null || quill==null) return;
        
        const handler = (delta,oldDelta,source)=>{
            if(source !== 'user') return;
            socket.emit('send-changes',delta);
            console.log('connection happened ',delta);
        }
        quill.on('text-change',handler);

        return ()=>{
            quill.off('text-change',handler);
        }
    },[socket,quill]);


    useEffect(()=>{

        if(socket==null || quill==null) return;
        
        const handler = (delta)=>{
           quill.updateContents(delta);
        }
        socket.on('recieve-changes',handler);

        return ()=>{
            socket.off('text-change',handler);
        }
    },[socket,quill]);

   
    return(
        <div className="container" ref={wrapperRef}>
        
        </div>

    );
}
export default TextEditor;
<template>
    <div>
    <el-upload
        class="upload-demo"
        drag
        action="http://localhost:8081/fileServer/upload"
        :on-success="handleUploadSuccess"
        :before-upload="beforeUpload"
    >
        <el-icon class="el-icon-upload"><UploadFilled/></el-icon>
        <div class="el-upload__text">Drag files here or click to upload</div>
    </el-upload>
    </div>
    <div>

        <a href="http://localhost:8081/fileServer/download?fileName=vuetest2.zip">download vuetest2.zip</a>


    </div>
</template>




<script setup>
import {UploadFilled} from '@element-plus/icons-vue';
import {ElUpload} from 'element-plus';

const handleUploadSuccess = (response, file, fileList) => {
    console.log('Upload successful:', response);
};
const beforeUpload = (file) => {
    console.log('Before upload:', file.name);
    // const isValidFileType = file.type === 'image/png' || file.type === 'image/jpeg';
    // if (!isValidFileType) {
    //     alert('Only PNG and JPEG files are allowed.');
    // }
    // return isValidFileType;
    return true; // Allow all files for now
};

</script>
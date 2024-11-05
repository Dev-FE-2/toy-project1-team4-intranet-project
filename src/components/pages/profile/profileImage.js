export function ProfileImage(imageSrc) {
	return `
    <div class="profile-image">
        <label for="uploadImage">
            <img src="${imageSrc}" alt="프로필 이미지">
        </label>
        <input type="file" id="uploadImage" style="display: none;" accept="image/*">
    </div>`;
}

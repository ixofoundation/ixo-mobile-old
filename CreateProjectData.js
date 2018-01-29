const data =
{
    "fields": [
        {
            "label": "Project Name",
            "name": "name",
            "type": "text"
        },
        {
            "label": "About",
            "name": "about",
            "type": "textarea"
        },
        {
            "label": "Country",
            "name": "country",
            "type": "country"
        },
        {
            "label": "Thumbnail",
            "name": "thumbnail",
            "type": "image"
        },
        {
            "label": "Owner Name",
            "name": "owner.name",
            "type": "text"
        },
        {
            "label": "Owner email",
            "name": "owner.email",
            "type": "text"
        },
        {
            "label": "Template Name",
            "name": "template.name",
            "type": "text",
            "hidden": "true"
        }
    ]
}

export default data;
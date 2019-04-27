define(["axios"], (axios) => {
    let list = document.querySelector(".list");
    let mask = document.querySelector(".mask");
    let confirm = document.querySelector(".confirm");
    let addcon = document.querySelector(".addcon");
    let addtitle = document.querySelector(".addtitle");
    const init = () => {
            getData()
        }
        //初始化页面渲染
    const getData = () => {
            axios.get("/getData").then(res => {
                render(res.data.data)
            })
        }
        //渲染数据
    const render = (data) => {
            list.innerHTML = data.map(item => {
                return ` <li>
            <h2 class="title">${item.title}</h2>
            <div class="content">
               ${item.content}
            </div>
            <div class="btnbox">
                <span class="update" data-id="${item._id}">修改</span>
                <span class="del">删除</span>
        </li>`
            }).join("")
            bindEvent()
        }
        //点击事件
    const bindEvent = () => {
        list.onclick = function(e) {
            let tar = e.target;
            if (tar.className === "update") {
                mask.style.display = "block";
                let parent = tar.parentNode.parentNode;
                let con = parent.querySelector(".content").innerHTML;
                let _id = tar.dataset.id;
                let tit = parent.querySelector(".title").innerHTML;
                addcon.value = con;
                addtitle.value = tit;
                confirm.onclick = function() {
                    if (addcon.value !== "" || addtitle.value !== "") {
                        console.log(addtitle.value)
                        axios.post("/addData", {
                            title: addtitle.value,
                            content: addcon.value,
                            _id: _id
                        }).then(res => {
                            location.reload()
                            alert("修改成功")
                        })

                        mask.style.display = "none";
                    } else {

                        alert("您的内容为空")
                    }



                }


            }

        }
        let btn = document.querySelector(".btn");

        btn.onclick = function() {
            mask.style.display = "block";
            confirm.onclick = function() {
                if (addcon.value !== "" || addtitle.value !== "") {
                    axios.post("/addData", {
                        title: addtitle.value,
                        content: addcon.value
                    }).then(res => {
                        let str = "";
                        if (res.data.code) {
                            str = `<li>
                                    <h2 class="title">${addtitle.value}</h2>
                                    <div class="content">
                                    ${addcon.value}
                                    </div>
                                    <div class="btnbox">
                                        <span class="update">修改</span>
                                        <span class="del">删除</span>
                                    </li>`
                        }
                        list.innerHTML = str + list.innerHTML;
                        mask.style.display = "none";
                    })
                } else {
                    alert("您的内容为空")
                }



            }
        }

    }
    init()
})
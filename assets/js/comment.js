{

    // method to submit the form data for new comment using AJAX

    let createComment = function(postId) {


        let newCommentForm = $(`#post-${postId}-comments-form`);
        newCommentForm.submit(function(e) {


            console.log("Comment request is submitted");
            e.preventDefault();


            $.ajax({

                type: "post",
                url: "/comments/create",
                data: newCommentForm.serialize(),
                success: function(data) {



                    let newComment = newCommentDom(data.data.comment)
                    $(`#post-comments-${postId}`).prepend(newComment);
                    deletePost($(" .delete-comment-button", newComment));
                },

                error: function(error) {

                    console.log(error.responseText);

                }

            })


        });
    }


    let newCommentDom = function(comment) {

        return $(`<li id="comment-${comment.id}">

                    <p>
                
                
                            <small>
                                        <a class="delete-comment-button" href="/comments/destroy/${comment.id}">X</a>
                            </small>
                
                            
                
                            ${ comment.content }
                                    <br>
                                    <small>
                                    ${ comment.user.name }
                                    </small>
                    </p>
    
    
    </li>`)
    }


    // method to delete a post from DOM
    let deletePost = function(deletelink) {

        $(deletelink).click(function(e) {

            e.preventDefault();

            $.ajax({

                type: "get",

                url: $(deletelink).prop('href'),
                success: function(data) {

                    $(`#comment-${data.comment.id}`).remove()

                },
                error: function(error) {

                    console.log(error.responseText);
                }


            })

        })


    }






    // createComment();
    $('#posts-list-container>ul>li').each(function() {
        let self = $(this);

        // get the post's id by splitting the id attribute
        let postId = self.prop('id').split("-")[1];
        createComment(postId);

    })


}
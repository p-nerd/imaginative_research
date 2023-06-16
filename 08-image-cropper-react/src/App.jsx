import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import ImageCropper from "./components/imageCropper/ImageCropper";

const ImageUploadingButton = ({ value, onChange, ...props }) => {
    return (
        <ImageUploading value={value} onChange={onChange}>
            {({ onImageUpload, onImageUpdate }) => (
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={value ? onImageUpload : () => onImageUpdate(0)}
                    {...props}
                >
                    Upload
                </button>
            )}
        </ImageUploading>
    );
};

function dataURLtoFile(dataURL) {
    let format = "";

    for (let i = 11; ; i++) {
        if (dataURL[i] === ";") {
            break;
        }
        format += dataURL[i];
    }

    const filename = Date.now() + `.${format}`;

    // Extract base64 data
    const base64Data = dataURL.split(",")[1];

    // Convert base64 to binary
    const binaryData = atob(base64Data);

    // Create an array buffer from binary data
    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
    }

    // Create a File object
    return new File([uint8Array], filename);
}

export default function App() {
    const [image, setImage] = useState([]);
    const [croppedImage, setCroppedImage] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <div className="App">
            <ImageUploadingButton
                value={image}
                onChange={(newImage) => {
                    setDialogOpen(true);
                    setImage(newImage);
                }}
            />
            <ImageCropper
                open={dialogOpen}
                image={image.length > 0 && image[0].dataURL}
                onComplete={(imagePromises) => {
                    imagePromises.then((image) => {
                        console.log(dataURLtoFile(image));

                        setCroppedImage(image);
                        setDialogOpen(false);
                    });
                }}
            />
            {croppedImage && <img src={croppedImage} alt="blab" />}
            <div className="bg-red-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                aliquam perferendis quia ratione omnis adipisci sapiente iste
                maiores doloremque odio ipsum reprehenderit autem sed, non,
                cupiditate cumque. Dolor omnis temporibus excepturi itaque et.
                Numquam amet impedit quos enim aliquam aperiam officia incidunt
                minus labore qui molestias necessitatibus, quas ut ab cumque
                asperiores exercitationem. Eligendi assumenda sequi ex veritatis
                provident vero eveniet? Nemo rem accusantium animi aliquid,
                consequuntur cumque! Reiciendis quidem molestiae vel non ipsum?
                Autem maxime labore molestiae praesentium numquam porro odit
                quos laborum blanditiis voluptatum fuga, rem, totam neque
                commodi. Libero, veritatis quaerat iusto rem ab aperiam
                voluptatem esse molestias vitae accusamus aut commodi ipsum
                adipisci. Neque, molestias earum reiciendis nemo amet ipsum
                natus quia, voluptates illo porro, ipsa ullam dolorem deleniti
                adipisci consequuntur sunt voluptatibus inventore? Aut
                voluptates quos, soluta, nulla dolor at culpa, aliquid
                perspiciatis totam velit qui! Ducimus perspiciatis doloremque
                dicta esse ratione voluptate illo, nihil dignissimos sapiente
                adipisci ipsum odit, amet magni nisi aspernatur eum. Eaque
                commodi corrupti, similique modi nemo enim reprehenderit
                officiis veritatis maxime ipsum facilis, quidem nisi rerum aut
                labore ex sequi sed facere fuga ut amet nostrum a laboriosam
                accusantium. Quod provident debitis eaque possimus aliquid
                magnam architecto quisquam. Quae suscipit alias saepe ad magnam
                tenetur quasi, iste quaerat dolorem officiis? Aliquam suscipit
                sapiente nisi nostrum dolores aut, consequatur vero et
                reprehenderit alias, excepturi provident inventore nam, ducimus
                similique fuga facilis debitis at harum. Sint beatae maiores
                distinctio, a rerum officiis fugit non illum aut laborum impedit
                praesentium dolorem quasi ipsa possimus! Repudiandae qui harum
                expedita facilis non alias maxime saepe eligendi! Exercitationem
                mollitia officiis magni itaque sequi et ullam ipsam
                voluptatibus, ducimus reprehenderit recusandae eveniet, eum
                quasi nam. Nemo placeat natus cupiditate tenetur reiciendis
                voluptas hic architecto ut ipsam, ducimus veritatis dolorem
                temporibus quidem optio eligendi qui iste beatae eveniet ab
                expedita? Quas cumque pariatur alias, dignissimos distinctio
                sunt corrupti amet ad, temporibus ea, dolores error vel fugiat.
                Non, tempore at. Tempora nam, molestias, neque culpa animi nisi
                mollitia amet impedit consequatur facere vel sint eveniet
                expedita dolor nobis libero odit hic molestiae incidunt ipsam.
                Dolor repudiandae, ipsa excepturi dolorem odit, iste similique
                nulla qui animi consequuntur repellendus vero error! Ab, cum.
                Provident nam, corporis quasi, laboriosam tenetur ipsa saepe id
                non ipsam vel cum a consequatur ab iusto deserunt nesciunt eum
                voluptates quod! Commodi sapiente harum omnis vitae accusamus
                sequi nihil consectetur animi odit, ut rerum nesciunt numquam
                architecto debitis, fugiat quis. Repellat, sunt voluptatem quos
                officiis a aut, consequatur ut, ex quidem fuga recusandae
                aliquid ducimus quo debitis earum alias. Dolorum incidunt,
                numquam odit enim placeat illum ullam tempore inventore repellat
                magnam! Nemo facere velit doloremque tenetur veritatis culpa
                cumque hic, soluta praesentium numquam natus laborum non ipsa
                quis iusto eveniet sit temporibus quasi deserunt dolor dolorum.
                Iusto expedita possimus eaque voluptatibus praesentium dicta ad
                natus fugiat animi aut autem sapiente delectus soluta nisi
                temporibus optio quae consequatur pariatur vitae asperiores,
                voluptates sequi maiores. Enim ex sint maxime velit rerum,
                molestias molestiae odio libero excepturi quo facilis fugit
                debitis odit quasi possimus nam autem vitae expedita. Iure
                praesentium laudantium laborum adipisci? Distinctio, aliquam
                sint laudantium ipsa id inventore qui eveniet quos, excepturi
                nihil dolore corporis suscipit rem in unde nulla alias
                obcaecati, impedit soluta architecto saepe mollitia a nam
                dolorum! Iusto, possimus eum magnam voluptatum quae minima,
                repellat maiores at accusamus eligendi numquam nemo, enim
                corrupti? Assumenda, quia nostrum alias beatae aliquid a
                voluptate quisquam minus eligendi distinctio facilis accusantium
                similique dolore hic ea libero. Quos possimus praesentium odit
                similique harum perferendis molestias? Aliquid quisquam
                asperiores consectetur dolor earum pariatur sapiente assumenda
                dolore. Necessitatibus aspernatur delectus dicta, perspiciatis
                aut odio illum nisi ratione ea totam quia corrupti harum
                laboriosam sed, sequi earum, nulla fugit. Cupiditate culpa
                veritatis accusamus! Cupiditate velit voluptatibus laborum
                saepe. Porro aliquid repellendus sit incidunt labore architecto
                quidem at earum obcaecati? Nam eveniet voluptates eos veniam
                mollitia temporibus corrupti quis et. Soluta magni possimus
                minus omnis est doloremque eligendi nostrum eveniet repellendus
                dolores voluptatem quod sint non ipsa excepturi, vel officia
                harum quasi inventore. Ullam natus, quod quam ea commodi
                corporis omnis necessitatibus, dolorum consequatur, quo iste
                mollitia. Ipsam hic et unde sed cumque cupiditate assumenda
                voluptatem at molestias suscipit quos sit nisi consequatur, non
                esse quis sequi illo itaque dolores laudantium? Illo amet autem
                neque corrupti ea expedita, ratione ut mollitia cumque laborum
                enim magni quod ipsum reprehenderit quos dicta voluptatibus ad
                laudantium maiores repellat aut et molestiae suscipit
                reiciendis? Alias eveniet nihil doloribus vero, repellat,
                accusamus doloremque cupiditate eligendi deserunt mollitia quos
                amet sapiente neque voluptatum molestiae dignissimos autem dicta
                natus totam pariatur dolorem delectus atque saepe. Veritatis
                ratione dignissimos modi atque minus odit suscipit quisquam?
                Dolor debitis sint magni asperiores sit odio accusantium
                officia, deserunt dicta molestiae, minima ad velit sequi facilis
                nostrum dignissimos quas aliquid quisquam repellendus libero
                labore suscipit harum. Aliquam adipisci laudantium eum delectus
                vel qui dolores beatae veniam. Rerum pariatur ipsam eveniet eius
                ratione, maxime at esse et enim ut quae molestias unde
                recusandae deserunt consequatur debitis omnis mollitia earum
                odio quam doloremque quia. Provident ipsam fugit, minima
                quibusdam architecto eveniet. Tempora sunt inventore sequi qui
                vitae cum, repellendus deleniti laborum sed! Soluta, labore. Est
                asperiores cupiditate, ad commodi quisquam facilis ut esse
                distinctio voluptates voluptatem dignissimos nam, quasi
                recusandae dolorem inventore minima dolore amet repudiandae
                libero alias dolorum quam? Odio in neque, iure eveniet nam
                laboriosam dolorum fugiat. Nisi nostrum dolore tenetur
                excepturi, laborum explicabo, ratione velit, ad voluptatem
                mollitia vero eum. Corrupti alias explicabo a cumque quo
                deleniti numquam pariatur in aspernatur accusantium. Voluptatem
                beatae aspernatur, iusto doloremque tenetur iste perspiciatis
                delectus alias, ipsum itaque sapiente veniam ex distinctio
                tempora officia id ad dolores amet maiores minima in nostrum
                architecto reiciendis. Corporis eos quae dignissimos id error
                est quos illo quidem obcaecati repudiandae impedit, amet saepe,
                laborum veritatis, necessitatibus natus quasi architecto omnis
                ducimus temporibus esse doloribus? Neque, aut? Laudantium sequi
                in aperiam beatae. Fugiat eum eius earum non adipisci aperiam
                quam minus illum facere nobis? Quam eius in laboriosam obcaecati
                sapiente aperiam distinctio ut debitis?
            </div>
        </div>
    );
}

import chef from "../assets/chef-claude-icon.png"
export default function Header(){
    return(
        <>
        <header>
            <img src={chef} alt="" />
            <h1>Chef Gemini</h1>
        </header>
        </>
    )
}
pragma solidity ^0.5.0;

contract Marketplace {
    string public name;
    uint public productsCount = 0;
    mapping(uint => Product) public products;
    
    struct Product {
        uint m_id;
        string m_name;
        uint m_price;
        address payable m_owner;
        bool m_purchased;
        string m_description;
        string m_photo;
    }
    
    event ProductCreated(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased,
        string description,
        string photo
    );
    
    event ProductPurchased(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased,
        string description,
        string photo
    );
    
    constructor() public {
        name = "Distributed Marketplace";
    }
    
    function createProduct(string memory p_name, uint p_price,string memory p_description, string memory p_photo) public {
        require(bytes(p_name).length > 0);
        require(p_price > 0);
        require(bytes(p_description) > 0);
        require(bytes(p_photo) > 0);
        
        productsCount++;
        products[productCount] = Product(productCount, p_name, p_price, msg.sender, false, p_description, p_photo);
        emit ProductCreated(productCount, p_name, p_price, msg.sender, false, p_description, p_photo);
    }
    
    function purchaseProduct(uint p_id) public payable {
        Product memory p_product = products[p_id];
        require(p_product.id > 0);
        require(p_product.id <= productsCount);
        require(msg.value >= p_product.price);
        require(!p_product.purchased);
        
        address payable p_seller = p_product.owner;
        
        require(p_seller != msg.sender);
        p_product.owner = msg.sender;
        p_product.purchased = true;
        products[p_id] = p_product;
        
        address(p_seller).transfer(msg.value);
        
        emit ProductPurchased(productCount, p_product.name, p_product.price, msg.sender, true, );
    }
}

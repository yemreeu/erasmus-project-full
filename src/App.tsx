import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Typography,
  Image,
  Row,
  Col,
  Button,
  message,
} from "antd";
import {
  PictureOutlined,
  LogoutOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

type MenuKey = "home" | "events";

const imageList = Array.from(
  { length: 18 },
  (_, i) => `/images/photo${i + 3}.jpeg`
);

const PASSWORD_KEY = "project_password";

const ENV_PASSWORD = import.meta.env.VITE_APP_PASSWORD;

const HomeContent: React.FC<{ onNavigate: (page: MenuKey) => void }> = ({
  onNavigate,
}) => (
  <div>
    <div
      style={{
        padding: 40,
        textAlign: "center",
        backgroundColor: "#fafafa",
        borderRadius: 8,
        marginBottom: 40,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Title level={2}>Liv Koleji Erasmus+ Projesine Hoşgeldiniz!</Title>
      <Paragraph
        style={{
          maxWidth: 600,
          margin: "auto",
          fontSize: 16,
          color: "#555",
          lineHeight: 1.6,
        }}
      >
        Öğrencilerimizin spor ve sağlıklı yaşam bilinci için gerçekleştirdiği
        etkinlikleri keşfedin.
      </Paragraph>
      <Button
        type="primary"
        size="large"
        style={{ marginTop: 20 }}
        onClick={() => onNavigate("events")}
      >
        Etkinliklere Git
      </Button>
    </div>

    <div
      style={{
        maxWidth: 700,
        margin: "auto",
        textAlign: "center",
        cursor: "pointer",
      }}
      onClick={() => onNavigate("events")}
    >
      <Title level={3}>
        Erasmus+ Project - A Happy Life in a Healthy Environment
      </Title>

      <Paragraph>
        LİV Koleji öğrencileri, Erasmus+ projesi kapsamında "I Do Sports, Not
        Virtual!" etkinliğini başarıyla gerçekleştirdiler. Etkinlikte
        öğrenciler, velileriyle birlikte çeşitli sportif faaliyetlere katılarak
        hem fiziksel aktivitenin önemine dikkat çektiler hem de sağlıklı yaşam
        bilincini güçlendirdiler. Bu anlamlı etkinlik, aile katılımını teşvik
        ederken, dijital bağımlılığa karşı farkındalık oluşturmayı da hedefledi.
      </Paragraph>
    </div>
  </div>
);

const App = () => {
  const [selectedMenu, setSelectedMenu] = useState<MenuKey>("home");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>("");

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.height = "100%";
    document.body.style.width = "100%";
    document.body.style.backgroundColor = "#f0f2f5";

    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.documentElement.style.height = "100%";
    document.documentElement.style.width = "100%";
  }, []);

  useEffect(() => {
    const savedPassword = localStorage.getItem(PASSWORD_KEY);
    if (savedPassword === ENV_PASSWORD) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (passwordInput === ENV_PASSWORD) {
      localStorage.setItem(PASSWORD_KEY, passwordInput);
      setIsAuthenticated(true);
      setSelectedMenu("home");
      message.success("Başarıyla giriş yapıldı!");
    } else {
      message.error("Yanlış şifre!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(PASSWORD_KEY);
    setIsAuthenticated(false);
    setSelectedMenu("home");
    message.info("Çıkış yapıldı.");
  };

  // Menü tıklama fonksiyonu - logout dışındakileri seçili yap, logout yap
  const handleMenuClick = (e: { key: string }) => {
    if (e.key === "logout") {
      handleLogout();
    } else {
      setSelectedMenu(e.key as MenuKey);
    }
  };

  if (!isAuthenticated) {
    return (
      <Layout
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 0,
          margin: 0,
          background: "#f0f2f5",
          width: "100vw",
        }}
      >
        <div
          style={{
            background: "white",
            padding: 40,
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            width: 300,
            textAlign: "center",
          }}
        >
          <Title level={3}>Giriş Yapınız</Title>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Şifre"
            style={{
              width: "100%",
              padding: 8,
              marginBottom: 16,
              fontSize: 16,
              borderRadius: 4,
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          <Button type="primary" onClick={handleLogin} block>
            Giriş
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      style={{
        minHeight: "100vh",
        width: "100vw",
        padding: 0,
        margin: 0,
        backgroundColor: "#f0f2f5",
      }}
    >
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 24px",
          flexWrap: "nowrap",
        }}
      >
        <div
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 18,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
          onClick={() => setSelectedMenu("home")}
        >
          Erasmus+ Project
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedMenu]}
          onClick={handleMenuClick}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 6,
            whiteSpace: "nowrap",
            overflowX: "auto",
          }}
        >
          <Menu.Item key="home" icon={<HomeOutlined />}>
            Anasayfa
          </Menu.Item>
          <Menu.Item key="events" icon={<PictureOutlined />}>
            Etkinlikler
          </Menu.Item>
          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            // onClick kaldırıldı çünkü handleMenuClick'de logout yönetiliyor
          >
            Çıkış Yap
          </Menu.Item>
        </Menu>
      </Header>

      <Content style={{ padding: 0, margin: 0, width: "100%" }}>
        <div
          style={{
            padding: 24,
            maxWidth: 1200,
            margin: "0 auto",
            boxSizing: "border-box",
            backgroundColor: "white",
            minHeight: "calc(100vh - 64px - 70px)",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          {selectedMenu === "home" && (
            <HomeContent onNavigate={setSelectedMenu} />
          )}

          {selectedMenu === "events" && (
            <>
              <Title level={3} style={{ marginBottom: 24 }}>
                Local Activity No:7 "I do sports, not virtual!"
              </Title>

              <Paragraph>
                LİV Koleji öğrencileri, Erasmus+ projesi kapsamında "I Do
                Sports, Not Virtual!" etkinliğini başarıyla gerçekleştirdiler.
                Etkinlikte öğrenciler, velileriyle birlikte çeşitli sportif
                faaliyetlere katılarak hem fiziksel aktivitenin önemine dikkat
                çektiler hem de sağlıklı yaşam bilincini güçlendirdiler. Bu
                anlamlı etkinlik, aile katılımını teşvik ederken, dijital
                bağımlılığa karşı farkındalık oluşturmayı da hedefledi.
              </Paragraph>

              <Row gutter={[16, 16]}>
                {imageList.map((src, i) => (
                  <Col key={i} xs={24} sm={12} md={8} lg={6} xl={4}>
                    <Image
                      src={src}
                      alt={`photo${i + 3}`}
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                        borderRadius: 6,
                        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                      }}
                      preview={true}
                    />
                  </Col>
                ))}
              </Row>
            </>
          )}
        </div>
      </Content>

      <Footer style={{ textAlign: "center", fontSize: 12, color: "#999" }}>
        Copyright © {new Date().getFullYear()} Liv College Erasmus+ Project. All
        rights reserved.
      </Footer>
    </Layout>
  );
};

export default App;

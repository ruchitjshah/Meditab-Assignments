using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json.Serialization;
using WebApplication1.DataAccessLayer;
using WebApplication1.ServiceLayer;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddScoped<IPatientDemographicsSL, PatientDemographicsSL>();
builder.Services.AddScoped<IPatientDemographicsDAL, PatientDemographicsDAL>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllersWithViews().AddNewtonsoftJson(options =>
options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
    .AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());

var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDefaultFiles();
    app.UseStaticFiles();
    app.UseSwagger();
    app.UseSwaggerUI();
}

/*var host = new WebHostBuilder()
        .UseKestrel()
        .UseWebRoot("HTMLFiles")
        .UseContentRoot(Directory.GetCurrentDirectory())
        .UseIISIntegration()
        .Build();*/

/*DefaultFilesOptions defaultFile = new DefaultFilesOptions();
defaultFile.DefaultFileNames.Clear();
defaultFile.DefaultFileNames.Add("./HTMLFiles/index.html");*/






app.UseAuthorization();

app.MapControllers();

app.Run();
